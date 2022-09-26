package capstone_project.domain;


import capstone_project.data.ReviewRepository;
import capstone_project.models.Review;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    public ReviewService(ReviewRepository repository) {
        this.repository = repository;
    }

    private final ReviewRepository repository;
    public List<Review> findAll(){
        return repository.findAll();
    }
    public Review findById(int reviewId){
        return repository.findById(reviewId);
    }
    public boolean delete(int reviewId){
        return repository.deleteById(reviewId);
    }

}
