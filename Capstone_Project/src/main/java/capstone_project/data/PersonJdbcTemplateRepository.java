package capstone_project.data;


import capstone_project.data.mappers.PersonMapper;
import capstone_project.models.Person;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
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
        final String sql = "select personId, firstName, middleName, lastName, suffix, photo, photoName, phone, locationId, appUserId "
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
                + " values (?,?,?,?,?,?,?,?,?);";

       KeyHolder keyHolder = new GeneratedKeyHolder();

        int rowsAffected = template.update(connection -> {
           PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, person.getFirstName());
            ps.setString(2, person.getMiddleName()== null ? null : person.getMiddleName());
            ps.setString(3, person.getLastName());
            ps.setString(4, person.getSuffix() == null ? null : person.getSuffix());
            File myFile = new File(person.getPhotoDir());
            FileInputStream fin;
            byte[] data;
            int sum = 0;
            for(int x = 0; x < person.getFirstName().length(); x++){
                sum += (int)(person.getFirstName().charAt(x));
            }
            try {
                fin = new FileInputStream(myFile);
                data = new byte[fin.available()];
                fin.read(data);
                int i = 0;
                for (byte b : data){
                    data[i] = (byte)(b ^ (sum+1253));
                    i++;
                }
                fin.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            ps.setBytes(5,data);
            ps.setString(6, person.getPhotoName());
            ps.setString(7, person.getPhone());
            ps.setInt(8, person.getLocationId());
            ps.setInt(9, person.getUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
           return null;
        }

        person.setId(keyHolder.getKey().intValue());
        return person;
   }

    @Override
    public boolean update(Person person) throws  IOException {
        final String sql = "update person set " +
                " firstName = ?," +
                " middleName = ?," +
                " lastName = ?," +
                " suffix = ?," +
                " photo = ?," +
                " photoName = ?," +
                " phone = ?," +
                " locationId = ?" +
                " where personId = ?;";


        Path p = FileSystems.getDefault().getPath(person.getPhotoDir());
        byte [] fileData = Files.readAllBytes(p);

        int rowCount = template.update(sql,
                person.getFirstName(),
                person.getMiddleName(),
                person.getLastName(),
                person.getSuffix(),
                fileData,
                person.getPhotoName(),
                person.getPhone(),
                person.getLocationId(),
                person.getId());

        return rowCount > 0;
    }


    @Override
    @Transactional
    public boolean deleteByIdPerson(int personId) {

        return template.update("delete from person where personId = ?;", personId) > 0;
    }

    @Override
    @Transactional
    public boolean deleteByIdBusinessAndPerson(int personId) {
        template.update("delete from business where personId = ?;", personId);
        return template.update("delete from person where personId = ?;", personId) > 0;

    }


}
