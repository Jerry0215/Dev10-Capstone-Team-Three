package capstone_project.data;

import capstone_project.data.mappers.EventMapper;
import capstone_project.data.mappers.LocationMapper;
import capstone_project.models.Event;
import capstone_project.models.Location;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class EventJdbcTemplateRepository implements EventRepository {

    private final JdbcTemplate jdbcTemplate;

    public EventJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Event> findAllByBusiness(int businessId) {
        final String sql = "select * from event where businessId = ? limit 1000;";
        return jdbcTemplate.query(sql, new EventMapper(), businessId);
    }

    @Override
    public List<Event> findAll() {
        final String sql = "select eventId, name, description, timeDate, businessId from event limit 1000;";
        return jdbcTemplate.query(sql, new EventMapper());
    }

    @Override
    public Event findById(int eventId) {
        final String sql = "select eventId, name, description, timeDate, businessId "
                + "from event "
                + "where eventId = ?;";

        return jdbcTemplate.query(sql, new EventMapper(), eventId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Event add(Event event) {
        final String sql = "insert into event (name, description, timeDate, businessId)"
                + "values (?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, event.getName());
            ps.setString(2, event.getDescription());
            ps.setTimestamp(3, event.getTimeDate());
            ps.setInt(4, event.getBusinessId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        event.setEventId(keyHolder.getKey().intValue());
        return event;
    }

    @Override
    public boolean update(Event event) {

        final String sql = "update event set "
                + "name = ?, "
                + "description = ?, "
                + "timeDate = ?, "
                + "businessId = ? "
                + "where eventId = ?;";

        return jdbcTemplate.update(sql,
                event.getName(),
                event.getDescription(),
                event.getTimeDate(),
                event.getBusinessId(),
                event.getEventId()) > 0;
    }

    @Override
    public boolean deleteById(int eventId) {
        return jdbcTemplate.update(
                "delete from event where eventId = ?", eventId) > 0;
    }
}
