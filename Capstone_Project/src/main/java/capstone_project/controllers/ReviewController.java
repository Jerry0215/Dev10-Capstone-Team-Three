package capstone_project.controllers;


import capstone_project.domain.Result;
import capstone_project.domain.ReviewService;
import capstone_project.models.Review;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService service;


    public ReviewController(ReviewService service) {
        this.service = service;
    }

    @GetMapping
    public List<Review> findAll(){
        return service.findAll();
    }

    @GetMapping("/{businessId}")
    public List<Review> findById(@PathVariable int businessId){
        return service.findById(businessId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Review review){
        Result<Review> result = service.add(review);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Object> update(@PathVariable int reviewId, @RequestBody Review review){
        if (reviewId!=review.getReviewId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Review> result = service.update(review);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> delete(@PathVariable int reviewId){
        if (service.delete(reviewId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
