package com.pgymp.backend.service;

import java.util.LinkedList;
import java.util.Queue;

import org.springframework.stereotype.Service;

@Service
public class Qservice {
    private Queue<String> myQueue = new LinkedList<>();

    public int joinQ(String matricID) {
        int currentPosition = pollQnumber(matricID);
        if (currentPosition != -1) {
            return currentPosition;
        }

        myQueue.add(matricID);
        return myQueue.size();
    }

    public int pollQnumber(String matricID) {
        int counter = 1;
        for (String id : myQueue) {
            if (id.equals(matricID)) {
                return counter;
            }
            counter++;
        }
        return -1;
    }

    public boolean hasWaitingUsers() {
        return !myQueue.isEmpty();
    }

    public String removefromQ() {
        return myQueue.remove();
    }
}
