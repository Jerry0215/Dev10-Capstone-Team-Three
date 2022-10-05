package capstone_project.data;

import capstone_project.models.Review;

import java.util.List;

public interface ReviewRepository {
    Review add(Review review);

    Review findByReviewId(int id);
    boolean update(Review review);
    List<Review> findById(int reviewId);
    List<Review> findAll();
    boolean deleteById(int ReviewId);
}
