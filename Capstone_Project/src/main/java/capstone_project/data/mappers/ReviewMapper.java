package capstone_project.data.mappers;

import capstone_project.models.Review;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewMapper implements RowMapper<Review> {
    @Override
    public Review mapRow(ResultSet resultSet, int i) throws SQLException{
        Review review = new Review();
        review.setReviewId(resultSet.getInt("reviewId"));
        review.setContent(resultSet.getString("content"));
        review.setTimeDate(resultSet.getTimestamp("timeDate"));
        review.setRating(resultSet.getInt("rating"));
        review.setPersonId(resultSet.getInt("personId"));
        review.setBusinessId(resultSet.getInt("businessId"));
        return review;

    }
}
