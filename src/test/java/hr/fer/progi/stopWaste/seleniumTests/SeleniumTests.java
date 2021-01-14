package hr.fer.progi.stopWaste.seleniumTests;

import hr.fer.progi.stopWaste.rest.dto.request.SignInUserDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;

import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class SeleniumTests {

    private static final String BASE_URL = "https://progi-stop-waste.herokuapp.com/";
    private static WebDriver driver;

    @BeforeEach
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "C:/Program Files (x86)/Chrome Driver/chromedriver.exe");
        driver = new ChromeDriver();

        driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);
        driver.manage().timeouts().pageLoadTimeout(60, TimeUnit.SECONDS);
        driver.manage().timeouts().setScriptTimeout(60, TimeUnit.SECONDS);
        driver.get(BASE_URL);
    }

    @Test
    public void testRegistrationSuccessful() {
        driver.get(BASE_URL);
        WebElement registraija = driver.findElement(By.linkText("Registracija"));
        registraija.click();

        assertEquals(BASE_URL + "registracija", driver.getCurrentUrl());

        driver.findElement(By.name("username")).sendKeys("Test user 20");

        driver.findElement(By.name("email")).sendKeys("test.mail20");
        Actions actions = new Actions(driver);
        actions.keyDown(Keys.LEFT_ALT).keyDown(Keys.LEFT_CONTROL);
        actions.sendKeys("V");
        actions.keyUp(Keys.LEFT_ALT).keyUp(Keys.LEFT_CONTROL);
        actions.build().perform();
        driver.findElement(By.name("email")).sendKeys("gmail.com");
        driver.findElement(By.name("password")).sendKeys("123456");
        driver.findElement(By.name("name")).sendKeys("user");
        driver.findElement(By.name("surname")).sendKeys("123456");
        driver.findElement(By.name("street")).sendKeys("unska");
        driver.findElement(By.name("number")).sendKeys("3");
        driver.findElement(By.name("postalCode")).sendKeys("10000");
        driver.findElement(By.name("city")).sendKeys("Zagreb");
        Select select = new Select(driver.findElement(By.name("role")));
        select.getOptions().get(1).click();
        driver.findElement(By.id("Meso")).click();
        driver.findElement(By.id("Med")).click();
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/form/div/div[7]/button")).click();
        assertEquals("Korisnik uspješno registriran!", driver.findElement(By.className("alert-success")).getText());
    }

    @Test
    public void testLogInSuccessful() {
        driver.get(BASE_URL);
        WebElement prijava = driver.findElement(new By.ByLinkText("Prijava"));
        prijava.click();

        assertEquals(BASE_URL + "prijava", driver.getCurrentUrl());

        SignInUserDTO user = new SignInUserDTO("JosipL", "123456");

        WebElement username = driver.findElement(By.name("username"));
        username.sendKeys(user.getUsername());

        WebElement password = driver.findElement(By.name("password"));
        password.sendKeys(user.getPassword());

        WebElement loginButton = driver.findElement(By.className("gumb1"));
        loginButton.click();

        String elementText = /*WebElement usernameElement =*/ driver.findElement(By.className("korisnickoime")).getText();
        assertEquals("korisničko ime: " + user.getUsername(), /*usernameElement.getText()*/elementText);
    }

    @Test
    public void testLogInNotSuccessful() {
        driver.get(BASE_URL);
        WebElement prijava = driver.findElement(new By.ByLinkText("Prijava"));
        prijava.click();

        assertEquals(BASE_URL + "prijava", driver.getCurrentUrl());

        SignInUserDTO user = new SignInUserDTO("NoNameUser", "123456");

        WebElement username = driver.findElement(By.name("username"));
        username.sendKeys(user.getUsername());

        WebElement password = driver.findElement(By.name("password"));
        password.sendKeys(user.getPassword());

        WebElement loginButton = driver.findElement(By.className("gumb1"));
        loginButton.click();

        WebElement alert = driver.findElement(By.className("alert-danger"));
        assertEquals("Prijava nije uspjela. Provjerite unesene podatke. Ako nemate račun, prvo se registriraje.", alert.getText());
    }

    @Test
    public void sendMessage() {
        SignInUserDTO user1 = new SignInUserDTO("JosipL", "123456");
        SignInUserDTO user2 = new SignInUserDTO("JosipLL", "123456");

        login(user1.getUsername(), user1.getPassword());

        driver.findElement(By.linkText("Poruke")).click();
        //driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[2]/a[3]")).click();
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/a/button")).click();


        assertEquals(BASE_URL + "novaporuka", driver.getCurrentUrl());

        driver.findElement(By.name("receiver")).sendKeys("JosipLL");
        String textMessage = "Hello! I'm interested in your ad";
        driver.findElement(By.name("message")).sendKeys(textMessage);
        driver.findElement(By.className("gumb1")).click();


        driver.findElement(By.linkText("Odjava")).click();

        login(user2.getUsername(), user2.getPassword());

        driver.findElement(By.linkText("Poruke")).click();
        boolean messageReceived = false;
        List<WebElement> messages = driver.findElements(By.className("card-oglas"));
        for (WebElement message : messages) {
            WebElement sender = message.findElements(By.tagName("b")).get(0);
            if (!sender.getText().equals(user1.getUsername()))
                continue;
            WebElement textMessageElement = message.findElements(By.tagName("p")).get(1);
            if (textMessageElement.getText().equals(textMessage))
                messageReceived = true;
        }
        assertTrue(messageReceived);
    }

    @Test
    public void postAd() {
        SignInUserDTO user = new SignInUserDTO("JosipL", "123456");
        login(user.getUsername(), user.getPassword());

        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[1]/a/button")).click();
        //driver.findElement(By.linkText("Dodaj oglas")).click();

        assertEquals(BASE_URL + "novioglas", driver.getCurrentUrl());

        String title = "Kava", price = "50", discount = "30";

        driver.findElement(By.name("title")).sendKeys(title);
        driver.findElement(By.name("price")).sendKeys(price);
        driver.findElement(By.name("discount")).sendKeys(discount);
        driver.findElement(By.name("deadline")).sendKeys("22012021", Keys.TAB, "1200");
        driver.findElement(By.name("pictureSource")).sendKeys("C:/Users/Korisnik/OneDrive/Slike/1588787534-489506-edgarangry.png");
        Select category = new Select(driver.findElement(By.name("category")));
        category.getOptions().get(0).click();
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/form/div[8]/button")).click();//predaj oglas

        assertEquals("Oglas objavljen!", driver.findElement(By.xpath("/html/body/div/div/div/div[2]/form/div[9]/div")).getText());

        driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[2]/a[4]")).click();//moji oglasi
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[1]/a[1]/button")).click();//predani oglasi

        List<WebElement> postedAds = driver.findElements(By.className("card-oglas"));
        boolean adPosted = false;
        for (int i = 0; i < postedAds.size(); i++) {
            WebElement ad = postedAds.get(i);
            WebElement adTitleAndDescription = ad.findElement(By.className("NaslovIOpis"));
            String adTitle = adTitleAndDescription.findElement(By.tagName("h2")).getText();
            if (adTitle.equals(title))
                adPosted = true;
        }

        assertTrue(adPosted);
    }

    @Test
    public void reserveAd() {
        SignInUserDTO user = new SignInUserDTO("JosipLL", "123456");
        login(user.getUsername(), user.getPassword());


        String adTitleElement = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[4]/div/div[2]/h2")).getText();

        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[4]/div/div[3]/button")).click();

        driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[2]/a[4]")).click();
        driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[1]/a[3]/button")).click();

        List<WebElement> reservedAds = driver.findElements(By.className("card-oglas"));
        boolean reserved = false;
        for (int i = 0; i < reservedAds.size(); i++) {
            WebElement ad = reservedAds.get(i);
            WebElement adTitleAndDescription = ad.findElement(By.className("NaslovIOpis"));
            String adTitle = adTitleAndDescription.findElement(By.tagName("h2")).getText();
            if (adTitle.equals(adTitleElement)) {
                reserved = true;
                break;
            }
        }
        assertTrue(reserved);
    }

    private void login(String username, String password) {
        driver.get(BASE_URL);
        driver.findElement(new By.ByLinkText("Prijava")).click();
        driver.findElement(By.name("username")).sendKeys(username);
        driver.findElement(By.name("password")).sendKeys(password);
        driver.findElement(By.className("gumb1")).click();
    }
}
