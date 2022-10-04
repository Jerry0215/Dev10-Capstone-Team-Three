package capstone_project.data;

import capstone_project.models.Business;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface BusinessRepository {
    Business add(Business business);
    Business findById(int businessId) throws SQLException, IOException;
    boolean deleteById(int businessId);
    boolean update(Business business) throws IOException, SQLException;
    List<Business> findAll() throws SQLException, IOException;

    Business findByPerson(int personId) throws SQLException, IOException;

}

