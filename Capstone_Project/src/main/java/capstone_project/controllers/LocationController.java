package capstone_project.controllers;

import capstone_project.domain.LocationService;
import capstone_project.domain.Result;
import capstone_project.models.Location;
import capstone_project.security.JwtConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/location")
public class LocationController {

    private final LocationService service;

    private final JwtConverter converter;

    public LocationController(LocationService service, JwtConverter converter) {
        this.service = service;
        this.converter = converter;
    }

    @GetMapping("/business/{businessId}")
    public ResponseEntity<Object> findByBusiness(@PathVariable int businessId) {
        List<Location> locations = service.findByBusiness(businessId);
        if(locations == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(locations);
    }

    @GetMapping
    public List<Location> findAll() {
        return service.findAll();
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<Location> findById(@PathVariable int locationId) {
        Location location = service.findById(locationId);
        if (location == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(location);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Location location) {
        Result<Location> result = service.add(location);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{locationId}")
    public ResponseEntity<Object> update(@PathVariable int locationId, @RequestBody Location location) {
        if (locationId != location.getLocationId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Location> result = service.update(location);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{locationId}")
    public ResponseEntity<Void> deleteById(@PathVariable int locationId) {
        if (service.deleteById(locationId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
