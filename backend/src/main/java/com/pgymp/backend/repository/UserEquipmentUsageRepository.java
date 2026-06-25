package com.pgymp.backend.repository;

import com.pgymp.backend.model.UserEquipmentUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserEquipmentUsageRepository extends JpaRepository<UserEquipmentUsage, Long> {
    List<UserEquipmentUsage> findByUserId(Long userId);

    void deleteByUserId(Long userId);
}
