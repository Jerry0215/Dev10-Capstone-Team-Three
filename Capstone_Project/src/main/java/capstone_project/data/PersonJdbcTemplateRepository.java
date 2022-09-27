package capstone_project.data;


import capstone_project.data.mappers.PersonMapper;
import capstone_project.models.Person;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class PersonJdbcTemplateRepository implements PersonRepository {

    private final JdbcTemplate template;

    public PersonJdbcTemplateRepository(JdbcTemplate template) {
        this.template = template;
    }

    @Override
    public List<Person> findAll(){
        final String sql = "select personId, firstName, middleName, lastName, suffix, photo, photoName phone, locationId, appUserId "
                + "from person;";
        return template.query(sql, new PersonMapper());
    }

    @Override
    public Person findById(int personId){
        final String sql = "select personId, firstName, middleName, lastName, suffix, photo, photoName, phone, locationId, appUserId "
                + "from person "
                + "where personId = ?;";

        Person person = template.query(sql, new PersonMapper(), personId).stream()
                .findFirst().orElse(null);

        return person;
    }


    @Override
    public Person add(Person person) {
       final String sql = "insert into person (firstName, middleName, lastName, suffix, photo, photoName, phone, locationId, appUserId) "
                + " values (?,?,?,?,?,?,?,?, ?);";

       KeyHolder keyHolder = new GeneratedKeyHolder();

        int rowsAffected = template.update(connection -> {
           PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, person.getFirstName());
            ps.setString(2, person.getMiddleName()== null ? null : person.getMiddleName());
            ps.setString(3, person.getLastName());
            ps.setString(4, person.getSuffix() == null ? null : person.getSuffix());
            File myFile = new File(person.getPhotoDir());
            FileInputStream fin;
            try {
                fin = new FileInputStream(myFile);
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }
            ps.setBinaryStream(5,fin, (int) myFile.length());
            ps.setString(6, person.getPhone());
            ps.setInt(7, person.getLocationId());
            ps.setInt(8, person.getUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
           return null;
        }

        person.setId(keyHolder.getKey().intValue());
        return person;
   }
}
