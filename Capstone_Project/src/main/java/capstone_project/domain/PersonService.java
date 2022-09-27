package capstone_project.domain;


import capstone_project.data.PersonRepository;
import capstone_project.models.Location;
import capstone_project.models.Person;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PersonService {

    private final PersonRepository repository;

    public PersonService(PersonRepository repository) {
        this.repository = repository;
    }

    public List<Person> findAll() {
        return repository.findAll();
    }

    public Person findById(int personId) {
        return repository.findById(personId);
    }

    public Result<Person> add(Person person) {
        Result<Person> result = validate(person);
        if (!result.isSuccess()) {
            return result;
        }

        if (person.getId() != 0) {
            result.addMessage("personId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        person = repository.add(person);
        result.setPayload(person);
        return result;
    }

    private Result<Person> validate(Person person) {
        Result<Person> result = new Result<>();

        if (person == null) {
            result.addMessage("person cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(person.getFirstName())) {
            result.addMessage("first name is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(person.getLastName())) {
            result.addMessage("Last Name is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(person.getPhotoDir())) {
            result.addMessage("Profile picture is required", ResultType.INVALID);
        }


        return result;
    }
}