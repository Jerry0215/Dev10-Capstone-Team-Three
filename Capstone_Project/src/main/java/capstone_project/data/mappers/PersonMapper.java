package capstone_project.data.mappers;


import capstone_project.models.Person;
import org.springframework.jdbc.core.RowMapper;


import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PersonMapper implements RowMapper<Person> {


    @Override
    public Person mapRow(ResultSet resultSet, int i) throws SQLException {


        Person person = new Person();
        person.setPersonId(resultSet.getInt("personId"));
        person.setFirstName(resultSet.getString("firstName"));
        person.setMiddleName(resultSet.getString("middleName"));
        person.setLastName(resultSet.getString("lastName"));
        person.setSuffix(resultSet.getString("suffix"));
        Blob blob = resultSet.getBlob("photo");
        person.setPhotoName(resultSet.getString("photoName"));
        person.setPhotoDir("pictures\\" + resultSet.getString("photoName"));
        byte[] data = blob.getBytes(1, (int) blob.length());
        try {
            FileOutputStream fileOutputStream = new FileOutputStream("client\\src\\"+person.getPhotoDir());
            fileOutputStream.write(data);
            System.out.println("File created!");
            fileOutputStream.close();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        person.setPhone(resultSet.getString("phone"));
        person.setLocationId(resultSet.getInt("locationId"));
        person.setUserId(resultSet.getInt("appUserId"));
        return person;
    }




}
