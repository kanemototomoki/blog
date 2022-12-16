use chrono::{DateTime, Datelike, NaiveDateTime, TimeZone, Utc};
use chrono_tz::{Asia::Tokyo, Tz};

fn main() {
    let utc: NaiveDateTime = Utc::now().naive_utc();
    let jst: DateTime<Tz> = Tokyo.from_utc_datetime(&utc);
    let today = format!("{}-{}-{}", jst.year(), jst.month(), jst.day());

    // utc: 2022-12-16 09:31:02.886862200
    // jst: 2022-12-16 18:31:02.886862200 JST
    // today: 2022-12-16
    println!("utc: {}", utc);
    println!("jst: {}", jst);
    println!("today: {}", today);
}
