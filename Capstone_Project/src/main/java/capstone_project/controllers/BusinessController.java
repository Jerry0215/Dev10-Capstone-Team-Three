package capstone_project.controllers;

import capstone_project.domain.BusinessService;
import capstone_project.domain.Result;
import capstone_project.models.Business;
import capstone_project.models.Person;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/business")
public class BusinessController {
    private final BusinessService service;

    public BusinessController(BusinessService service) {
        this.service = service;
    }

    @GetMapping("/search/{prefix}")
    public List<Business> findByName(@PathVariable String prefix) throws SQLException, IOException { return service.findByName(prefix); }


    @GetMapping
    public List<Business> findAll() throws SQLException, IOException {
        return service.findAll();
    }
    @GetMapping("/{businessId}")
    public Business findById(@PathVariable int businessId) throws SQLException, IOException {
        return service.findById(businessId);
    }

    @GetMapping("/byPerson/{personId}")
    public Business findByPerson(@PathVariable int personId) throws SQLException, IOException{
        return service.findByPerson(personId);
    }
    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Business business){
        Result<Business> result = service.add(business);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{businessId}")
    public ResponseEntity<Object> update(@PathVariable int businessId, @RequestBody Business business) throws SQLException, IOException {

        if (businessId != business.getBusinessId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Business> result = service.update(business);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{businessId}")
    public ResponseEntity<Void> delete(@PathVariable int businessId){
        if (service.deleteById(businessId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
