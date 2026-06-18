package com.pgymp.backend.repository;

import com.pgymp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByMatricId(String matricId);

    boolean existsByMatricId(String matricId);

    //TODO some weird database tracking -learn after Milestone2


}