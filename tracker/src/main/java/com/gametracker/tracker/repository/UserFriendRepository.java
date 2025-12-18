package com.gametracker.tracker.repository;

import com.gametracker.tracker.model.User;
import com.gametracker.tracker.model.UserFriend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface UserFriendRepository extends JpaRepository<UserFriend, Long>{
    List<UserFriend> findByRequesterIdOrAddresseeId(Long userId, Long userId2);
    UserFriend findByRequesterIdAndAddresseeId(Long userId, Long userId2);
    Boolean existsByRequesterAndAddressee(User request, User addressee);
    Optional<UserFriend> findByRequesterAndAddressee(User requester, User addressee);
}
