package capstone_project.data;

import capstone_project.models.Location;

public interface LocationRepository {

    Location findById(int locationId);

    Location add(Location location);

    boolean update(Location location);

    boolean deleteById(int locationId);

}
