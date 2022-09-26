package capstone_project.data.mappers;

import capstone_project.models.Location;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LocationMapper implements RowMapper<Location> {


    @Override
    public Location mapRow(ResultSet resultSet, int i) throws SQLException {
        Location location = new Location();
        location.setLocationId(resultSet.getInt("locationId"));
        location.setAddress(resultSet.getString("address"));
        location.setCity(resultSet.getString("city"));
        location.setState(resultSet.getString("state"));
        location.setZipCode(resultSet.getString("zipCode"));
        location.setAddressType(resultSet.getString("addressType"));
        return location;
    }

}
