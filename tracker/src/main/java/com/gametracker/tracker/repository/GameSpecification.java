package com.gametracker.tracker.repository;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import com.gametracker.tracker.model.Game;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class GameSpecification {

    // Filter logic
    public static Specification<Game> findByCriteria(String name, Double price, LocalDate releaseDate, List<String> developers, List<String> publishers, Boolean windows, Boolean mac, Boolean linux, List<String> genres, List<String> categories, List<String> tags) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (name != null && !name.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
            }

            if (price != null && price >= 0) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), price));
            }

            if(releaseDate != null){
                predicates.add(criteriaBuilder.equal(root.get("releaseDate"), releaseDate));
            }

            if (developers != null && !developers.isEmpty()) {
                addListFilter(predicates, criteriaBuilder, root, "developers", developers);
            }

            if (publishers != null && !publishers.isEmpty()) {
                addListFilter(predicates, criteriaBuilder, root, "publishers", publishers);
            }

            if (categories != null && !categories.isEmpty()) {
                addListFilter(predicates, criteriaBuilder, root, "categories", categories);
            }
            
            if (tags != null && !tags.isEmpty()) {
                addListFilter(predicates, criteriaBuilder, root, "tags", tags);
            }

            if (genres != null && !genres.isEmpty()) {
                addListFilter(predicates, criteriaBuilder, root, "genres", genres);
            }

            if (windows != null) {
                predicates.add(criteriaBuilder.equal(root.get("windows"), windows));
            }

            if (mac != null) {
                predicates.add(criteriaBuilder.equal(root.get("mac"), mac));
            }

            if (linux != null) {
                predicates.add(criteriaBuilder.equal(root.get("linux"), linux));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    /**
     * First time writing comment like this
     * Helper method for creating filters for collections of type List<String>.
     * It creates a group of conditions (LIKE ... OR LIKE ...) for the given list of values.
     * @param predicates The main list of query predicates.
     * @param cb The CriteriaBuilder.
     * @param root The query Root.
     * @param collectionName The name of the collection field in the Game entity (e.g., "developers").
     * @param filterValues The list of values to search for.
     */
    private static void addListFilter(List<Predicate> predicates, CriteriaBuilder cb, Root<Game> root, String collectionName, List<String> filterValues) {
        // We create an array of conditions LIKE for every value in list
        Predicate[] valuePredicates = filterValues.stream()
                .map(value -> cb.like(cb.lower(root.join(collectionName)), "%" + value.toLowerCase() + "%"))
                .toArray(Predicate[]::new);

        // If there are any condition, we combine them into one big OR condition
        if (valuePredicates.length > 0) {
            predicates.add(cb.or(valuePredicates));
        }
    }
}