package capstone_project.data;

import capstone_project.models.Person;

import java.util.List;

public interface PersonRepository {
    List<Person> findAll();

    Person findById(int personId);

    Person add(Person person);
}
