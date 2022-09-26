package capstone_project.data;

import capstone_project.data.mappers.LocationMapper;
import capstone_project.models.Location;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class LocationJdbcTemplateRepository implements LocationRepository {


    private final JdbcTemplate jdbcTemplate;

    public LocationJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Location> findAll() {
        final String sql = "select locationId, address, city, state, zipCode, addressType from location limit 1000;";
        return jdbcTemplate.query(sql, new LocationMapper());
    }

    @Override
    public Location findById(int locationId) {
        final String sql = "select locationId, address, city, state, zipCode, addressType "
                + "from location "
                + "where locationId = ?;";

        return jdbcTemplate.query(sql, new LocationMapper(), locationId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Location add(Location location) {
        final String sql = "insert into location (address, city, state, zipCode, addressType)"
                + "values (?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, location.getAddress());
            ps.setString(2, location.getCity());
            ps.setString(3, location.getState());
            ps.setString(4, location.getZipCode());
            ps.setString(5, location.getAddressType());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        location.setLocationId(keyHolder.getKey().intValue());
        return location;
    }

    @Override
    public boolean update(Location location) {

        final String sql = "update location set "
                + "address = ?, "
                + "city = ?, "
                + "state = ?, "
                + "zipCode = ?, "
                + "addressType = ? "
                + "where locationId = ?;";

        return jdbcTemplate.update(sql,
                location.getAddress(),
                location.getCity(),
                location.getState(),
                location.getZipCode(),
                location.getAddressType(),
                location.getLocationId()) > 0;
    }

    @Override
    public boolean deleteById(int locationId) {
        return jdbcTemplate.update(
                "delete from location where locationId = ?", locationId) > 0;
    }
}
