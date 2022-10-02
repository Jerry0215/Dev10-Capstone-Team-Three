package capstone_project.data;

import capstone_project.models.Person;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface PersonRepository {

    List<Person> findAll();

    Person findById(int personId);

    Person add(Person person);

    boolean update(Person person) throws IOException, SQLException;

    @Transactional
    boolean deleteByIdPerson(int personId);

    @Transactional
    boolean deleteByIdBusinessAndPerson(int personId);
}
