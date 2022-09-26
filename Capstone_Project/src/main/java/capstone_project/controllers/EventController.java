package capstone_project.controllers;


import capstone_project.domain.EventService;
import capstone_project.domain.Result;
import capstone_project.models.Event;
import capstone_project.models.Location;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/event")
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping
    public List<Event> findAll() {
        return service.findAll();
    }

    @GetMapping("/{eventId}")
    public Event findById(@PathVariable int eventId) {
        return service.findById(eventId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Event event) {
        Result<Event> result = service.add(event);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<Object> update(@PathVariable int eventId, @RequestBody Event event) {
        if (eventId != event.getEventId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Event> result = service.update(event);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteById(@PathVariable int eventId) {
        if (service.deleteById(eventId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
