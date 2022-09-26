package capstone_project.domain;

import capstone_project.data.LocationRepository;
import capstone_project.models.Location;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository repository;

    public LocationService(LocationRepository repository) {
        this.repository = repository;
    }

    public List<Location> findAll() {
        return repository.findAll();
    }

    public Location findById(int locationId) {
        return repository.findById(locationId);
    }

    public Result<Location> add(Location location) {
        Result<Location> result = validate(location);
        if (!result.isSuccess()) {
            return result;
        }

        if (location.getLocationId() != 0) {
            result.addMessage("locationId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        location = repository.add(location);
        result.setPayload(location);
        return result;
    }

    public Result<Location> update(Location location) {
        Result<Location> result = validate(location);
        if (!result.isSuccess()) {
            return result;
        }

        if (location.getLocationId() <= 0) {
            result.addMessage("locationId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(location)) {
            String msg = String.format("locationId: %s, not found", location.getLocationId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int locationId) {
        return repository.deleteById(locationId);
    }


    private Result<Location> validate(Location location) {
        Result<Location> result = new Result<>();

        if (location == null) {
            result.addMessage("location cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(location.getAddress())) {
            result.addMessage("address is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(location.getCity())) {
            result.addMessage("city is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(location.getState())) {
            result.addMessage("state is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(location.getZipCode())) {
            result.addMessage("zipcode is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(location.getAddressType())) {
            result.addMessage("addressType is required", ResultType.INVALID);
        }

        return result;
    }



}
