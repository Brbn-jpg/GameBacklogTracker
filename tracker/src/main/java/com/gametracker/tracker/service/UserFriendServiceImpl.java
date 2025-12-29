package com.gametracker.tracker.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.gametracker.tracker.dto.user.ListUserResponseDto;
import com.gametracker.tracker.dto.user.UserResponseDto;
import com.gametracker.tracker.dto.userFriend.AddUserFriendDto;
import com.gametracker.tracker.dto.userFriend.UserFriendDto;
import com.gametracker.tracker.dto.userFriend.UserSearchResponseDto;
import com.gametracker.tracker.dto.userGames.UserGameResponseDto;
import com.gametracker.tracker.enums.FriendRequestStatus;
import com.gametracker.tracker.exceptions.ForbiddenAccessException;
import com.gametracker.tracker.exceptions.UserFriendNotFoundException;
import com.gametracker.tracker.exceptions.UserNotFoundException;
import com.gametracker.tracker.model.User;
import com.gametracker.tracker.model.UserFriend;
import com.gametracker.tracker.repository.UserFriendRepository;
import com.gametracker.tracker.repository.UserFriendSpecification;
import com.gametracker.tracker.repository.UserRepository;
import com.gametracker.tracker.security.JwtService;

import jakarta.transaction.Transactional;

@Service
public class UserFriendServiceImpl implements UserFriendService{
    private UserFriendRepository userFriendRepository;
    private UserGameServiceImpl userGameServiceImpl;
    private UserRepository userRepository;
    private JwtService jwtService;

    public UserFriendServiceImpl(UserFriendRepository userFriendRepository, UserGameServiceImpl userGameServiceImpl, UserRepository userRepository, JwtService jwtService){
        this.userFriendRepository = userFriendRepository;
        this.userGameServiceImpl = userGameServiceImpl;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    @Transactional
    public UserFriendDto addFriend(AddUserFriendDto dto, String token){
        User requester = findUser(token);
        User addressee = this.userRepository.findByUsername(dto.getTargetUserUsername()).orElseThrow(() -> new UserNotFoundException("User with username: "+dto.getTargetUserUsername()+" was not found"));
        if(requester.getId().equals(addressee.getId())){
            throw new IllegalAccessError("You cannot invite yourself");
        }

        boolean relationExists = this.userFriendRepository.existsByRequesterAndAddressee(requester, addressee) || 
                                 this.userFriendRepository.existsByRequesterAndAddressee(addressee, requester);
        if(relationExists){
            throw new IllegalAccessError("Friend request already sent or you are already friends");
        }

        UserFriend userFriend = new UserFriend();
        userFriend.setRequester(requester);
        userFriend.setAddressee(addressee);
        userFriend.setFriendRequestStatus(FriendRequestStatus.PENDING);
        userFriend.setInvitedAt(LocalDate.now());

        this.userFriendRepository.save(userFriend);
        return mapToDto(userFriend, requester.getId());
    }

    @Override
    public Page<UserSearchResponseDto> browsePeople(String username, String token, Pageable pageable){
        User currentUser = findUser(token);

        Specification<User> spec = UserFriendSpecification.findByCriteria(username)
                .and((root, query, cb) -> cb.notEqual(root.get("id"), currentUser.getId()));
        
        Page<User> usersPage = this.userRepository.findAll(spec, pageable);

        if (usersPage.isEmpty()) {
            return Page.empty(pageable);
        }

        List<UserFriend> relations = this.userFriendRepository.findByRequesterIdOrAddresseeId(currentUser.getId(), currentUser.getId());

        Map<Long, FriendRequestStatus> relationMap = new HashMap<>();
        relations.forEach(r -> relationMap.put(
            r.getAddressee().getId().equals(currentUser.getId()) ? r.getRequester().getId() : r.getAddressee().getId(),
            r.getFriendRequestStatus()
        ));

        return usersPage.map(u -> {
            UserSearchResponseDto dto = new UserSearchResponseDto();
            dto.setId(u.getId());
            dto.setUsername(u.getUsername());

            if (u.getId().equals(currentUser.getId())) {
                 dto.setStatus(null); 
            } else {
                FriendRequestStatus relation = relationMap.get(u.getId());
                dto.setStatus(relation);
            }
            return dto;
        });
    }

    @Override
    @Transactional
    public UserFriendDto declineRequest(Long userFriendId, String token){
        User currentUser = findUser(token);
        UserFriend userFriend = this.userFriendRepository.findById(userFriendId).orElseThrow(() -> new UserFriendNotFoundException("Friend request not found"));

        if(!userFriend.getAddressee().getId().equals(currentUser.getId())) {
            throw new IllegalStateException("You are not authorized to accept this request");
        }

        this.userFriendRepository.delete(userFriend);
        return mapToDto(userFriend, currentUser.getId());
    }

    @Override
    @Transactional
    public UserFriendDto acceptRequest(Long userFriendId, String token){
        User currentUser = findUser(token);
        UserFriend userFriend = this.userFriendRepository.findById(userFriendId).orElseThrow(() -> new UserFriendNotFoundException("Friend request not found"));

        if(!userFriend.getAddressee().getId().equals(currentUser.getId())) {
            throw new IllegalStateException("You are not authorized to accept this request");
        }

        userFriend.setFriendRequestStatus(FriendRequestStatus.ACCEPTED);
        this.userFriendRepository.save(userFriend);
        return mapToDto(userFriend, currentUser.getId());
    }

    @Override
    @Transactional
    public void removeFriend(AddUserFriendDto dto, String token){
        User currentUser = findUser(token);
        User friendToRemove = this.userRepository.findByUsername(dto.getTargetUserUsername())
                                   .orElseThrow(() -> new UserNotFoundException("User with username: "+dto.getTargetUserUsername()+" was not found"));

        if(currentUser.getId().equals(friendToRemove.getId())){
            throw new IllegalArgumentException("You cannot remove yourself from your friend list.");
        }

        UserFriend userFriendToDelete = this.userFriendRepository.findByRequesterAndAddressee(currentUser, friendToRemove)
            .orElse(this.userFriendRepository.findByRequesterAndAddressee(friendToRemove, currentUser)
            .orElseThrow(() -> new UserFriendNotFoundException("You are not friends with " + dto.getTargetUserUsername())));

        this.userFriendRepository.delete(userFriendToDelete);
    }

    @Override
    public List<ListUserResponseDto> getFriendsList(String token){
        User user = findUser(token);
        List<UserFriend> friends = this.userFriendRepository.findByRequesterIdOrAddresseeId(user.getId(), user.getId());
        return friends.stream()
                    .filter(f -> f.getFriendRequestStatus() == FriendRequestStatus.ACCEPTED)
                    .map(f -> mapFriendToDto(f, user.getId())).toList();
    }

    @Override
    public List<ListUserResponseDto> getFriendRequests(String token){
        User user = findUser(token);
        List<UserFriend> friends = this.userFriendRepository.findByRequesterIdOrAddresseeId(user.getId(), user.getId());
        return friends.stream()
                    .filter(f -> f.getFriendRequestStatus() == FriendRequestStatus.PENDING)
                    .filter(f -> f.getAddressee().getId().equals(user.getId()))
                    .map(f -> mapFriendToDto(f, user.getId())).toList();
    }

    // Helpers
    private User findUser(String token){
        String jwt = token;

        if(token != null && token.startsWith("Bearer ")){
            jwt = token.substring(7);
        }

        if(!jwtService.isTokenValid(jwt)){
            throw new ForbiddenAccessException("Invalid or expired token");
        }

        long userId = jwtService.extractId(jwt);
        return this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User with userId "+userId+" was not found"));
    }

    private UserFriendDto mapToDto(UserFriend userFriend, Long currentUserId){
        if(userFriend == null){
            return null;
        }
        User otherUser = userFriend.getRequester().getId().equals(currentUserId)
                        ? userFriend.getAddressee() 
                        : userFriend.getRequester();

        UserFriendDto dto = new UserFriendDto();
        dto.setId(userFriend.getId());
        dto.setStatus(userFriend.getFriendRequestStatus());
        dto.setInvitedAt(userFriend.getInvitedAt());
        
        dto.setAmIRequester(userFriend.getRequester().getId().equals(currentUserId));
        dto.setFriend(mapUserToDto(otherUser));
        return dto;
    }

    private ListUserResponseDto mapFriendToDto(UserFriend friend, Long currentUserId){
        User friendEntity = friend.getRequester().getId().equals(currentUserId) 
                        ? friend.getAddressee() 
                        : friend.getRequester();

        ListUserResponseDto dto = new ListUserResponseDto();
        dto.setId(friend.getId());
        dto.setUserId(friendEntity.getId());
        dto.setUsername(friendEntity.getUsername());
        return dto;
    }

    private UserResponseDto mapUserToDto(User user){
        UserResponseDto dto = new UserResponseDto();
        dto.setUsername(user.getUsername());
        dto.setUserGames(getUserGames(user));
        return dto;
    }

    private List<UserGameResponseDto> getUserGames(User user){
        return user.getUserGames().stream().map(userGameServiceImpl::mapToDto).collect(Collectors.toList());
    }
}
