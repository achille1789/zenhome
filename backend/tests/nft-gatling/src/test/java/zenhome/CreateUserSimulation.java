package zenhome;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

import java.util.concurrent.ThreadLocalRandom;
import java.util.Iterator;
import java.util.Map;
import java.util.function.Supplier;
import java.util.stream.Stream;

public class CreateUserSimulation extends Simulation {

    HttpProtocolBuilder httpProtocol = http.baseUrl("http://localhost:8000")
            .acceptHeader("application/json");

    Iterator<Map<String, Object>> feeder =
            Stream.generate((Supplier<Map<String, Object>>) () -> {
                        String email = "user" + ThreadLocalRandom.current().nextInt(1000, 10000) + "@gmail.com";
                        String password = "someValidPassword";
                        return Map.<String, Object>of("email", email, "password", password);
                    }
            ).iterator();

    ScenarioBuilder myFirstScenario = scenario("Create User Scenario")
            .feed(feeder)
            .exec(http("Create User")
                    .post("/v1/create")
                    .body(StringBody("{\"email\": \"#{email}\", \"password\": \"#{password}\"}")).asJson());

    {
        setUp(
                myFirstScenario.injectOpen(constantUsersPerSec(2).during(60))
        ).protocols(httpProtocol);
    }
}
