package capstone_project.data;

import capstone_project.models.Person;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

public interface PersonRepository {

    List<Person> findAll();

    Person findById(int personId);

    Person add(Person person);

    boolean update(Person person) throws IOException;

    @Transactional
    boolean deleteByIdPerson(int personId);

    @Transactional
    boolean deleteByIdBusinessAndPerson(int personId);
}
