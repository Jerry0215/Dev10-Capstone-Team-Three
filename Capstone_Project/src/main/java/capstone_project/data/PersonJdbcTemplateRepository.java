package capstone_project.data;


import capstone_project.data.mappers.PersonMapper;
import capstone_project.models.Person;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PersonJdbcTemplateRepository {

    private final JdbcTemplate template;

    public PersonJdbcTemplateRepository(JdbcTemplate template) {
        this.template = template;
    }

    public List<Person> findAll(){
        final String sql = "select personId, firstName, middleName, lastName, suffix, photo, phone, locationId, appUserId "
                + "from person;";
        return template.query(sql, new PersonMapper());
    }

    public Person findById(int personId){
        final String sql = "select personId, firstName, middleName, lastName, suffix, photo, phone, locationId, appUserId "
                + "from person "
                + "where personId = ?;";

        Person person = template.query(sql, new PersonMapper(), personId).stream()
                .findFirst().orElse(null);

        return person;
    }

    public Person add(Person person) {
        final String sql = "insert into person ("
    }
}
