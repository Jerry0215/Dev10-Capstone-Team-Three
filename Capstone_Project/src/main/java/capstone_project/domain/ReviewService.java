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
    public List<Review> findById(int businessId){
        return repository.findById(businessId);
    }

    public Review findByReviewId(int reviewId){
        return repository.findByReviewId(reviewId);
    }
    public boolean delete(int reviewId){
        return repository.deleteById(reviewId);
    }
    public Result<Review> add(Review review){
        Result<Review> result = validate(review);
        if (!result.isSuccess()){
            return result;
        }
        if (review.getReviewId()!=0){
            result.addMessage("reviewId must not be set for add operation",ResultType.INVALID);
            return result;
        }
        review = repository.add(review);
        result.setPayload(review);
        return result;
    }

    public Result<Review> update(Review review){
        Result<Review> result = validate(review);
        if (!result.isSuccess()){
            return result;
        }
        if (review.getReviewId()<=0){
            result.addMessage("reviewId must be set for update operation",ResultType.INVALID);
            return result;
        }

        if (!repository.update(review)){
            result.addMessage("review not found",ResultType.NOT_FOUND);
        }
        return result;
    }





    public Result<Review> validate(Review review){
        Result<Review> result = new Result<>();
        if (review == null){
            result.addMessage("review cannot be null",ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(review.getContent())){
            result.addMessage("event must have a description",ResultType.INVALID);
        }
        if (Validations.isNullOrBlank(review.getTimeDate().toString())){
            result.addMessage("event must have a date",ResultType.INVALID);
        }
        if (review.getPersonId()<0){
            result.addMessage("event must have a host",ResultType.INVALID);
        }
        if (review.getBusinessId()<0){
            result.addMessage("event must be held at a business",ResultType.INVALID);
        }
        return result;
    }

}
