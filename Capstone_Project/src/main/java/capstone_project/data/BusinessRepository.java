package capstone_project.data;

import capstone_project.models.Business;

import java.util.List;

public interface BusinessRepository {
    public Business add(Business business);
    public Business findById(int businessId);
    public boolean deleteById(int businessId);
    public boolean update(Business business);
    public List<Business> findAll();
}
