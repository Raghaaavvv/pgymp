package com.pgymp.backend.service;

import com.pgymp.backend.dto.HeatmapEntry;
import com.pgymp.backend.model.CheckInLog;
import com.pgymp.backend.repository.CheckInLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class HeatmapService {

    private static final int OPEN_HOUR = 7;
    private static final int CLOSE_HOUR = 23;

    @Autowired
    private CheckInLogRepository checkInLogRepository;

    public List<HeatmapEntry> getHeatmap() {
        List<CheckInLog> logs = checkInLogRepository.findAll();

        // Group logs into (day, hourBucket) -> count
        Map<String, Long> grouped = logs.stream()
                .filter(log -> {
                    int hour = log.getCheckInTime().getHour();
                    return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
                })
                .collect(Collectors.groupingBy(
                        log -> {
                            String day = log.getCheckInTime().getDayOfWeek()
                                    .getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
                            int hour = log.getCheckInTime().getHour();
                            int bucket = OPEN_HOUR + 2 * ((hour - OPEN_HOUR) / 2);
                            return day + "-" + bucket;
                        },
                        Collectors.counting()
                ));

        List<HeatmapEntry> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : grouped.entrySet()) {
            String[] parts = entry.getKey().split("-");
            String day = parts[0];
            int hour = Integer.parseInt(parts[1]);
            result.add(new HeatmapEntry(day, hour, entry.getValue().intValue()));
        }

        return result;
    }
}