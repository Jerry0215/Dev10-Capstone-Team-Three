package capstone_project.data;

import capstone_project.models.Event;
import capstone_project.models.Event;

import java.util.List;

public interface EventRepository {

    List<Event> findAll();
    Event findById(int eventId);

    Event add(Event event);

    boolean update(Event event);

    boolean deleteById(int eventId);
    
    
}
