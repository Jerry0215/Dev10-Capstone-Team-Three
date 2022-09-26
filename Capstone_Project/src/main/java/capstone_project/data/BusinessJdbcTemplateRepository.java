package capstone_project.data;

import capstone_project.data.mappers.BusinessMapper;
import capstone_project.data.mappers.EventMapper;
import capstone_project.models.Business;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class BusinessJdbcTemplateRepository implements BusinessRepository{
    private final JdbcTemplate jdbcTemplate;

    public BusinessJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Business findById(int businessId){
        final String sql = "select * "
                +"from business "
                +"where businessId = ?;";

        return jdbcTemplate.query(sql,new BusinessMapper(), businessId).stream()
                .findFirst()
                .orElse(null);
    }
    @Override
    public List<Business> findAll() {
        final String sql = "select * "
                + "from business;";

        return jdbcTemplate.query(sql, new BusinessMapper());
    }
    @Override
    public Business add(Business business){
        final String sql = "insert into business (businessId, name, description, rating, locationId, personId) "
                + "values (?,?,?,?,?,?);";

        KeyHolder keyHolder =  new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1,business.getBusinessId());
            ps.setString(2,business.getName());
            ps.setString(3,business.getDescription());
            ps.setInt(4,business.getRating());
            ps.setInt(5,business.getLocationId());
            ps.setInt(6,business.getPersonId());
            return ps;
        }, keyHolder);
        if (rowsAffected<= 0){
            return null;
        }
        business.setBusinessId(keyHolder.getKey().intValue());
        return business;
    }
    @Override
    public boolean update(Business business){
        final String sql = "update business set "
                +"name = ?, "
                +"description = ?, "
                +"rating = ?, "
                +"locationId = ?, "
                +"personId = ? "
                +"where businessId = ?;";
        return jdbcTemplate.update(sql,
                business.getName(),
                business.getDescription(),
                business.getRating(),
                business.getLocationId(),
                business.getPersonId()) > 0;
    }
    @Override
    public boolean deleteById(int businessId){
        return jdbcTemplate.update(
                "delete from business where businessId = ?", businessId)>0;
    }
}
