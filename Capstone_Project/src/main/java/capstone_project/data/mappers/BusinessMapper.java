package capstone_project.data.mappers;

import capstone_project.models.Business;
import capstone_project.models.Event;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BusinessMapper implements RowMapper<Business> {


    @Override
    public Business mapRow(ResultSet resultSet, int i) throws SQLException {
        Business business = new Business();
        business.setBusinessId(resultSet.getInt("businessId"));
        business.setName(resultSet.getString("name"));
        business.setDescription(resultSet.getString("description"));
        business.setRating(resultSet.getInt("rating"));
        business.setLocationId(resultSet.getInt("locationId"));
        business.setPersonId(resultSet.getInt("personId"));
        return business;
    }

}
