package org.apereo.cas.mgmt;

import org.apereo.cas.mgmt.controller.ApplicationDataController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import static org.junit.jupiter.api.Assertions.*;


/**
 * Test class for ApplicationDataController.
 *
 * @author Travis Schmidt
 * @since 6.0
 */
public class ApplicationDataControllerTests extends BaseCoreTests {

    @Autowired
    @Qualifier("applicationDataController")
    private ApplicationDataController applicationDataController;

    @Test
    public void managerType() {
        assertEquals("DEFAULT", applicationDataController.getManagerType());
    }

    @Test
    public void formData() {
        assertNotNull(applicationDataController.getFormData());
    }

    @Test
    public void footer() {
        assertNotNull(applicationDataController.footer());
    }

    @Test
    public void appConfig() {
        assertNotNull(applicationDataController.appConfig());
    }

}
