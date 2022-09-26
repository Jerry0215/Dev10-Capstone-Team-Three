package capstone_project.data;

import capstone_project.models.Event;
import capstone_project.models.Event;

public interface EventRepository {

    Event findById(int eventId);

    Event add(Event event);

    boolean update(Event event);

    boolean deleteById(int eventId);
    
    
}
