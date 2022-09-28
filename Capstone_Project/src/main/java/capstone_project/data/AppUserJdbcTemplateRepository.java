package capstone_project.data;

import capstone_project.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;


@Repository

public class AppUserJdbcTemplateRepository implements AppUserRepository {

    private final JdbcTemplate template;

    public AppUserJdbcTemplateRepository(JdbcTemplate template) {
        this.template = template;
    }

    @Override
    public AppUser findByUsername(String name) {
        List<String> roles = findRolesByUsername(name);

        final String sql = "select appUserId, username, passwordHash, disabled " +
                "from appUser " +
                "where username = ?;";


        return template.query(sql, (rs, i) -> new AppUser(
                rs.getInt("appUserId"),
                rs.getString("username"),
                rs.getString("passwordHash"),
                rs.getBoolean("disabled"),
                roles
        ), name).stream().findFirst().orElse(null);
    }

    private List<String> findRolesByUsername(String name) {
        final String sql = "select ar.`name` " +
                "from appUser au " +
                "left join appUserRole aur on au.appUserId = aur.appUserId " +
                "left join appRole ar on ar.appRoleId = aur.appRoleId " +
                "where au.username = ?;";

        return template.query(sql, (rs, i) -> rs.getString("name"), name);

    }

    @Override
    public AppUser create(AppUser user) {
        final String sql = "insert into appUser (username, passwordHash, disabled) values (?, ?, ?);";
        KeyHolder holder = new GeneratedKeyHolder(); // use consistent patterns

        int rowCount = template.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, user.getUsername());
            statement.setString(2, user.getPassword());
            statement.setBoolean(3, !user.isEnabled());

            return statement;
        }, holder);

        if (rowCount == 0) {
            return null;
        }

        user.setAppUserId(holder.getKey().intValue());

        updateRoles(user.getAppUserId(), AppUser.convertAuthoritiesToRoles(user.getAuthorities()));

        return user;
    }

    private void updateRoles(int appUserId, List<String> roles) {
        template.update("delete from appUserRole where appUserId = ?", appUserId);

        if (roles == null) {
            return;
        }

        for (String role : roles) {
            template.update("insert into appUserRole " +
                    "select ?, appRoleId from appRole where `name` = ?;", appUserId, role);
        }
    }
}
