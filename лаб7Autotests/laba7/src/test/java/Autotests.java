import com.codeborne.selenide.Selenide;
import org.junit.Test;

import static com.codeborne.selenide.Selenide.*;

public class Autotests {
    @Test
    public void tests(){
        test01Open();
        test02Company();
        test03Contacts();
        test04Main();
        test05Search();
        test06Honey();
        test07WithBlueberry();
        test08Choose0_5kg();
        test19Question();
        test09Buy();
        test10ChangeCount();
        test11UpdateCost();
        test12PlaceAnOrder();
        test13Cancel();
        test14Delete();
        test15Gallery();
        test16Photo();
        test04Main();
        test17Cosmetics();
        test18WashCloth();
        test20VK();
    }

    public void test01Open(){
        open("https://pravilniy-med.ru/");
        Selenide.sleep(2000);
    }

    public void test02Company(){
        $x("//a[@href='/o-kompanii']").click();
        Selenide.sleep(2000);
    }

    public void test03Contacts(){
        $x("//a[@href='/kontakty']").click();
        Selenide.sleep(2000);
    }

    public void test04Main(){
        $x("//a[@title='Мёд и травы Алтая']").click();
        Selenide.sleep(2000);
    }

    public void test05Search(){
        $x("//a[@href='#collapsesearch']").click();
        Selenide.sleep(1000);
        $x("//input[@name='keyword']").setValue("цветочный").pressEnter();
        Selenide.sleep(3000);
    }

    public void test06Honey(){
        $x("//a[@href='#catalog']").click();
        Selenide.sleep(2000);
        $x("//a[@href='/med/krem-med-naturalnyj']").click();
        Selenide.sleep(2000);
    }

    public void test07WithBlueberry(){
        $x("//a[@href='/med/krem-med-naturalnyj/krem-mjod-s-golubikoj-kupit']").click();
        Selenide.sleep(2000);
    }

    public void test08Choose0_5kg(){
        $x("//a[@href='/med/krem-med-naturalnyj/krem-mjod-s-golubikoj-1-kupit']").click();
        Selenide.sleep(3000);
    }

    public void test09Buy(){
        $x("//input[@type='submit']").click();
        Selenide.sleep(3000);
        $x("//a[@class='showcart btn btn-success']").click();
    }

    public void test10ChangeCount(){
        $x("//input[@name='quantity[0]']").setValue("3");
        Selenide.sleep(3000);
    }
    public void test11UpdateCost(){
        $x("//button[@class='vmicon vm2-add_quantity_cart btn btn-outline-secondary btn-sm mx-2']").click();
        Selenide.sleep(2000);
    }
    public void test12PlaceAnOrder(){
        $x("//button    [@name='checkout']").click();
        Selenide.sleep(3000);
    }
    public void test13Cancel(){
        $x("//button[@type='reset']").click();
        Selenide.sleep(3000);
    }
    public void test14Delete(){
        $x("//button[@class='vmicon vm2-remove_from_cart btn btn-outline-danger btn-sm']").click();
        Selenide.sleep(3000);
    }
    public void test15Gallery(){
        $x("//a[@href='/galereya']").click();
        Selenide.sleep(2000);
    }
    public void test16Photo(){
        $x("//a[@href='/images/gallery/IMG_4574.jpg']").click();
        Selenide.sleep(2000);
        $x("//div[@class='boxplusx-close']").click();
    }
    public void test17Cosmetics(){
        $x("//img[@src='/images/menu-icons/kosmetika.jpg']").click();
        Selenide.sleep(2000);
    }
//    public void test18WashCloth(){
//        $x("//div[@class='category-div col-auto mb-3']").click();
//        Selenide.sleep(2000);
//    }
//    public void test18WashCloth(){
//        $("a[href=\"/kosmetika/mochalki-s-organicheskim-mylom\"]").click();
//        Selenide.sleep(2000);
//    }
    public void test18WashCloth(){
        open("https://pravilniy-med.ru/kosmetika/mochalki-s-organicheskim-mylom");
        Selenide.sleep(2000);
    }
    public void test19Question(){
        $x("//a[@href='#zakaz']").click();
        Selenide.sleep(2000);
        $x("//button[@class='btn-close']").click();
        Selenide.sleep(2000);
    }
    public void test20VK(){
        Selenide.atBottom();
        $x("//a[@class='fab fa-vk d-inline-block text-center fs-5 text-decoration-none text-white rounded']").click();
        Selenide.sleep(7000);
    }

}
