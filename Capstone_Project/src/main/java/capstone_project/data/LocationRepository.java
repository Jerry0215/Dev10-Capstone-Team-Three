package capstone_project.data;

import capstone_project.models.Business;
import capstone_project.models.Location;

import java.util.List;

public interface LocationRepository {

    List<Location> findByBusiness(int businessId);

    List<Location> findAll();
    Location findById(int locationId);

    Location add(Location location);

    boolean update(Location location);

    boolean deleteById(int locationId);

}
