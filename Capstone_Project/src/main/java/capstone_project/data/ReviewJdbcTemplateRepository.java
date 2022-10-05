package capstone_project.data;


import capstone_project.data.mappers.ReviewMapper;
import capstone_project.models.Review;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ReviewJdbcTemplateRepository implements ReviewRepository{
    private final JdbcTemplate jdbcTemplate;


    public ReviewJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Review> findById(int businessId){
        final String sql = "select * "
                +"from review "
                +"where businessId = ?;";
        return jdbcTemplate.query(sql,new ReviewMapper(), businessId);
    }

    @Override
    public Review findByReviewId(int reviewId){
        final String sql = "select * "
                +"from review "
                +"where reviewId = ?;";
        return jdbcTemplate.query(sql,new ReviewMapper(),reviewId).stream().findFirst().orElse(null);

    }
    @Override
    public List<Review> findAll(){
        return jdbcTemplate.query("select * from review;", new ReviewMapper());
    }
    @Override
    public Review add(Review review){
        final String sql = "insert into review (content, timeDate, rating, personId, businessId) "
                +"values (?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1,review.getContent());
            ps.setTimestamp(2,review.getTimeDate());
            ps.setInt(3,review.getRating());
            ps.setInt(4,review.getPersonId());
            ps.setInt(5,review.getBusinessId());
            return ps;
        }, keyHolder);
        if (rowsAffected<=0){
            return null;
        }
        review.setBusinessId(keyHolder.getKey().intValue());
        return review;
    }
    @Override
    public boolean update(Review review){
        final String sql = "update review set "
                +"content = ?, "
                +"timeDate = ?, "
                +"rating = ?, "
                +"personId = ?, "
                +"businessId = ? "
                +"where reviewId = ?;";
        return jdbcTemplate.update(sql,
                review.getContent(),
                review.getTimeDate(),
                review.getRating(),
                review.getPersonId(),
                review.getBusinessId(),
                review.getReviewId()) > 0;
    }
    @Override
    public boolean deleteById(int reviewId){
        return jdbcTemplate.update("delete from review where reviewId = ?;", reviewId) > 0;
    }
}
