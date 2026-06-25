package com.pgymp.backend.service;

import com.pgymp.backend.dto.EquipmentToReact;
import com.pgymp.backend.model.Equipment;
import com.pgymp.backend.model.UserEquipmentUsage;
import com.pgymp.backend.repository.EquipmentRepository;
import com.pgymp.backend.repository.UserEquipmentUsageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private UserEquipmentUsageRepository userEquipmentUsageRepository;


    public List<EquipmentToReact> getEquipment() {
        // Reads equipment rows from the database and converts them into JSON-friendly DTOs.
        return equipmentRepository.findAll()
                .stream()
                .map(equipment -> new EquipmentToReact(
                        equipment.getName(),
                        equipment.getTotal(),
                        equipment.getInUse()
                ))
                .toList();
    }

    @Transactional
    public List<EquipmentToReact> checkInEquipment(Long userID, List<String> equipmentNames) {
  
        List<Equipment> selectedEquipment = equipmentRepository.findByNameIn(equipmentNames);

        for (Equipment equipment : selectedEquipment) {
            if (equipment.getInUse() < equipment.getTotal()) {
                equipment.setInUse(equipment.getInUse() + 1);
                equipmentRepository.save(equipment);

                userEquipmentUsageRepository.save(new UserEquipmentUsage(userID, equipment.getId()));
            }
        }

        return getEquipment();
    }

    public List<EquipmentToReact> getEquipmentByUser(Long userID) {
        List<Long> equipmentIds = userEquipmentUsageRepository.findByUserId(userID)
                .stream()
                .map(UserEquipmentUsage::getEquipmentId)
                .toList();

        return equipmentRepository.findAllById(equipmentIds)
                .stream()
                .map(equipment -> new EquipmentToReact(
                        equipment.getName(),
                        equipment.getTotal(),
                        equipment.getInUse()
                ))
                .toList();
    }

    @Transactional
    public List<EquipmentToReact> checkOutEquipment(Long userID) {
        //streamify and change equipment NAME TO ID;
        List<Long> equipmentIds = userEquipmentUsageRepository.findByUserId(userID)
                .stream()
                .map(UserEquipmentUsage::getEquipmentId)
                .toList();

        List<Equipment> itemsUserIsUsing = equipmentRepository.findAllById(equipmentIds);

        for (Equipment equipment : itemsUserIsUsing) {
            if (equipment.getInUse() > 0) {
                equipment.setInUse(equipment.getInUse() - 1);
                equipmentRepository.save(equipment);
            }
        }

        userEquipmentUsageRepository.deleteByUserId(userID);

        return getEquipment();
    }
}
/*findAll(): Fetches everything. (SELECT * FROM equipment)
findAll(Sort sort): Fetches everything sorted by specific columns.
findAll(Pageable pageable): Fetches a specific subset/page of data for pagination.
findById(Long id): Fetches a single record matching the primary key id. Returns an Optional<Equipment>. (SELECT * FROM equipment WHERE id = ?)
findAllById(Iterable<Long> ids): Fetches multiple specific records matching a list of IDs. (SELECT * FROM equipment WHERE id IN (?, ?, ...))
count(): Returns the total number of rows in the table as a long. (SELECT COUNT(*) FROM equipment)
existsById(Long id): Returns a boolean checking if a record exists.
2. Save and Update Methods (Simulating INSERT and UPDATE)
Spring Data JPA uses the exact same method for both creating new rows and updating existing ones. If the entity has an ID that already exists in the table, it updates it; if the ID is blank or new, it inserts it.
save(Equipment entity): Inserts or updates a single equipment record.
saveAll(Iterable<Equipment> entities): Saves or updates an entire batch/list of equipment records at once.
saveAndFlush(Equipment entity): Saves the changes and forces an immediate sync with the database right that second (instead of waiting for the transaction block to end).
3. Delete Methods (Simulating DELETE)
deleteById(Long id): Deletes a specific row matching the ID. (DELETE FROM equipment WHERE id = ?)
delete(Equipment entity): Deletes a specific record using its object reference.
deleteAllById(Iterable<Long> ids): Deletes a custom list of records matching the provided IDs.
deleteAll(Iterable<Equipment> entities): Deletes a batch list of passed objects.
deleteAll(): Wipes out the entire table completely. (TRUNCATE TABLE or DELETE FROM equipment)
4. Custom Derivation Queries (The Magic Naming Rules)
Beyond the completely pre-made options above, Raghav can declare custom methods in that interface just by naming them cleanly, and Spring will automatically auto-generate the SQL:
findByName(String name): Automatically maps to SELECT * FROM equipment WHERE name = ?
findByInUseGreaterThan(int count): Automatically maps to SELECT * FROM equipment WHERE in_use > ?*/
