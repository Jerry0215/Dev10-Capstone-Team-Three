package capstone_project.data;

import capstone_project.data.mappers.BusinessMapper;
import capstone_project.data.mappers.EventMapper;
import capstone_project.data.mappers.ReviewMapper;
import capstone_project.models.Business;
import capstone_project.models.Review;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class BusinessJdbcTemplateRepository implements BusinessRepository{
    private final JdbcTemplate jdbcTemplate;

    public BusinessJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Business findById(int businessId){
        final String sql = "select * "
                +"from business "
                +"where businessId = ?;";

        Business business = jdbcTemplate.query(sql,new BusinessMapper(), businessId).stream()
                .findFirst()
                .orElse(null);

        updateRating(business);

        return business;
    }
    @Override
    public List<Business> findAll() {
        final String sql = "select * "
                + "from business;";

        List<Business> businessList = jdbcTemplate.query(sql, new BusinessMapper());

        for(Business business : businessList){
            updateRating(business);
        }

        return businessList;

    }
    @Override
    public Business add(Business business){
        final String sql = "insert into business (name, description, photo, photoName, rating, locationId, personId) "
                + "values (?,?,?,?,?,?,?);";

        KeyHolder keyHolder =  new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1,business.getName());
            ps.setString(2,business.getDescription());
            Path pathToAFile = Paths.get(business.getPhotoDir());

            File myFile = new File(business.getPhotoDir());
            FileInputStream fin;
            byte[] data;
            int sum = 0;
            for(int x = 0; x < business.getName().length(); x++){
                sum += (int)(business.getName().charAt(x));
            }
            try {
                fin = new FileInputStream(myFile);
                data = new byte[fin.available()];
                fin.read(data);
                int i = 0;
                for (byte b : data){
                    data[i] = (byte)(b ^ (sum+1253));
                    i++;
                }
                fin.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            ps.setBytes(3,data);
            ps.setString(4,pathToAFile.getFileName().toString());
            ps.setInt(5,0);
            ps.setInt(6,business.getLocationId());
            ps.setInt(7,business.getPersonId());
            return ps;
        }, keyHolder);
        if (rowsAffected<= 0){
            return null;
        }
        business.setBusinessId(keyHolder.getKey().intValue());
        return business;
    }
    @Override
    public boolean update(Business business){
        final String sql = "update business set "
                +"name = ?, "
                +"description = ?, "
                +"rating = ?, "
                +"locationId = ?, "
                +"personId = ? "
                +"where businessId = ?;";
        return jdbcTemplate.update(sql,
                business.getName(),
                business.getDescription(),
                business.getRating(),
                business.getLocationId(),
                business.getPersonId(),
                business.getBusinessId()) > 0;
    }

    private void updateRating(Business business){
        if(business == null){
            return;
        }

        final String sql = "select sum(rating)/count(*) "
                +"from review "
                +"where businessId = ?;";
        Double avg = jdbcTemplate.queryForObject(sql,Double.class, business.getBusinessId());
        System.out.println(avg);


        business.setRating(avg == null ? 10 : avg);

        update(business);


    }
    @Override
    public boolean deleteById(int businessId){
        return jdbcTemplate.update(
                "delete from business where businessId = ?;", businessId)>0;
    }
}
