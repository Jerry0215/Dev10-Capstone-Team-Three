package capstone_project.domain;

import capstone_project.data.EventRepository;
import capstone_project.models.Event;
import capstone_project.models.Location;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {

    private final EventRepository repository;

    public EventService(EventRepository repository) {
        this.repository = repository;
    }

    public List<Event> findAll() {
        return repository.findAll();
    }

    public Event findById(int eventId) {
        return repository.findById(eventId);
    }

    public Result<Event> add(Event event) {
        Result<Event> result = validate(event);
        if (!result.isSuccess()) {
            return result;
        }

        if (event.getEventId() != 0) {
            result.addMessage("eventId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        event = repository.add(event);
        result.setPayload(event);
        return result;
    }

    public Result<Event> update(Event event) {
        Result<Event> result = validate(event);
        if (!result.isSuccess()) {
            return result;
        }

        if (event.getEventId() <= 0) {
            result.addMessage("eventId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(event)) {
            String msg = String.format("eventId: %s, not found", event.getEventId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int eventId) {
        return repository.deleteById(eventId);
    }

    private Result<Event> validate(Event event) {
        Result<Event> result = new Result<>();
        if (event == null) {
            result.addMessage("event cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(event.getName())) {
            result.addMessage("name is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(event.getDescription())) {
            result.addMessage("description is required", ResultType.INVALID);
        }

        if (event.getTimeDate() != null && event.getTimeDate().before(Timestamp.valueOf(LocalDateTime.now()))) {
            result.addMessage("events cannot be made for the past", ResultType.INVALID);
        }

        return result;
    }
    
    
}
