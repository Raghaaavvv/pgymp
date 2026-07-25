package com.pgymp.backend.repository;

import com.pgymp.backend.model.CheckInLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckInLogRepository extends JpaRepository<CheckInLog, Long> {
}