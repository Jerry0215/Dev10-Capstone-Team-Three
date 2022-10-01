package capstone_project.data.mappers;

import capstone_project.models.Business;
import capstone_project.models.Event;
import org.springframework.jdbc.core.RowMapper;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;

public class BusinessMapper implements RowMapper<Business> {


    @Override
    public Business mapRow(ResultSet resultSet, int i) throws SQLException {
        Business business = new Business();
        business.setBusinessId(resultSet.getInt("businessId"));
        business.setName(resultSet.getString("name"));
        business.setDescription(resultSet.getString("description"));
        Blob blob = resultSet.getBlob("photo");

        business.setPhotoDir("pictures\\" + resultSet.getString("photoName"));
        byte[] data = blob.getBytes(1, (int) blob.length());
        
        try {
            FileOutputStream fileOutputStream = new FileOutputStream("client\\src\\"+business.getPhotoDir());
            fileOutputStream.write(data);
            System.out.println("File created!");
            fileOutputStream.close();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        business.setRating(resultSet.getDouble("rating"));
        business.setLocationId(resultSet.getInt("locationId"));
        business.setPersonId(resultSet.getInt("personId"));
        return business;
    }

}
