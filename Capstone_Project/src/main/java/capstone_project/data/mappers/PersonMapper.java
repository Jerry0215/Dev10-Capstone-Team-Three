package capstone_project.data.mappers;


import capstone_project.models.Person;
import org.springframework.jdbc.core.RowMapper;

import javax.swing.*;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PersonMapper implements RowMapper<Person> {


    @Override
    public Person mapRow(ResultSet resultSet, int i) throws SQLException {


        Person person = new Person();
        person.setId(resultSet.getInt("personId"));
        person.setFirstName(resultSet.getString("firstName"));
        person.setMiddleName(resultSet.getString("middleName"));
        person.setLastName(resultSet.getString("lastName"));
        person.setSuffix(resultSet.getString("suffix"));
        Blob blob = resultSet.getBlob("photo");
        person.setPhotoDir("pictures\\" + resultSet.getString("photoName"));
        try {
            FileOutputStream fileOutputStream = new FileOutputStream("pictures\\test2.jpg");
            fileOutputStream.write(blob.getBytes(1, (int) blob.length()));
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
