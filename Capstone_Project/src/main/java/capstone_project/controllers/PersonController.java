package capstone_project.controllers;


import capstone_project.domain.PersonService;
import capstone_project.domain.Result;
import capstone_project.models.Person;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

    @PutMapping("/{personId}")
    public ResponseEntity<Object> update(@PathVariable int personId, @RequestBody Person person) throws IOException {
        if (personId != person.getId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Person> result = service.update(person);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return ErrorResponse.build(result);
    }


    @DeleteMapping("/{personId}")
    public ResponseEntity<Void> deleteById(@PathVariable int personId) {
        if (service.deleteById(personId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}