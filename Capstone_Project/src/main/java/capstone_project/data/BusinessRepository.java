package capstone_project.data;

import capstone_project.models.Business;

import java.util.List;

public interface BusinessRepository {
    Business add(Business business);
    Business findById(int businessId);
    boolean deleteById(int businessId);
    boolean update(Business business);
    List<Business> findAll();
}

