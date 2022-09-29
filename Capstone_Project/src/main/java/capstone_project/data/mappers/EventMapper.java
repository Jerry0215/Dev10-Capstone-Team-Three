package capstone_project.data.mappers;

import capstone_project.models.Event;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

public class EventMapper implements RowMapper<Event> {


    @Override
    public Event mapRow(ResultSet resultSet, int i) throws SQLException {
        Event event = new Event();
        event.setEventId(resultSet.getInt("eventId"));
        event.setName(resultSet.getString("name"));
        event.setDescription(resultSet.getString("description"));
        event.setTimeDate(resultSet.getTimestamp("timeDate"));
        event.setBusinessId(resultSet.getInt("businessId"));
        return event;
    }
    
}

