package capstone_project.controllers;


import capstone_project.domain.PersonService;
import capstone_project.domain.Result;
import capstone_project.models.Person;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/person")
public class PersonController {

    private final PersonService service;


    public PersonController(PersonService service) {
        this.service = service;
    }


    @GetMapping
    public List<Person> findAll() {return service.findAll();}


    @GetMapping("/{personId}")
    public Person findById(@PathVariable int personId) {
        return service.findById(personId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Person person) {
        Result<Person> result = service.add(person);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }


}