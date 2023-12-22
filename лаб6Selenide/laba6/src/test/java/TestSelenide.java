import com.codeborne.selenide.Condition;
import com.codeborne.selenide.Selenide;
import org.junit.Test;

import static com.codeborne.selenide.Selenide.$x;
import static com.codeborne.selenide.Selenide.open;

public class TestSelenide {

    @Test
    public void testGoogle(){
        open("https://www.google.ru/");
        $x("//textarea[@name='q']").setValue("Воробьёва Ульяна Геннадьевна").pressEnter();
        Selenide.sleep(3000);
    }
}
