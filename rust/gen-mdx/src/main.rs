use chrono::{Datelike, TimeZone, Utc};
use chrono_tz::Asia::Tokyo;
use regex::Regex;
use std::env;
use std::fs::read_to_string;
use std::fs::File;
use std::io::prelude::*;
use std::path::PathBuf;
use structopt::StructOpt;

#[derive(StructOpt)]
#[structopt(name = "gen-mdx")]
struct GenMdx {
    #[structopt(name = "FILE_NAME", help = "please, input file name")]
    file_name: String,
}

impl GenMdx {
    fn run(&self) {
        let result = self.create_mdx();
        match result {
            Ok(message) | Err(message) => println!("{}", message),
        }
    }
    fn create_mdx(&self) -> Result<String, String> {
        let current_dir: PathBuf =
            env::current_exe().expect("ERROR: failed to get current exe path");
        let new_file_name = format!("{}.mdx", self.file_name);
        let parent = current_dir.parent().unwrap().parent().unwrap();
        let path_to_template_file: PathBuf = parent.join(PathBuf::from("template.mdx"));
        let path_to_new_file: PathBuf = parent.join(PathBuf::from(&new_file_name));

        if path_to_new_file.is_file() {
            return Err(format!(
                "ERROR: {} はすでに存在します。",
                format!("{}.mdx", self.file_name)
            ));
        }

        let utc = Utc::now().naive_utc();
        let jst = Tokyo.from_utc_datetime(&utc);
        let today = format!("{}-{}-{}", jst.year(), jst.month(), jst.day());

        let regex: Regex = Regex::new(r"xxxx-xx-xx").unwrap();
        let mut template_str = String::new();
        match read_to_string(path_to_template_file) {
            Ok(content) => {
                let replace_str = regex.replace_all(&content, today);
                template_str.push_str(&replace_str);
            }
            Err(reason) => println!("{}", reason),
        }

        let mut new_file: File =
            File::create(path_to_new_file).expect("ファイルの作成に失敗しました。");
        new_file
            .write_all(template_str.as_bytes())
            .expect("ファイルの作成に失敗しました。");

        return Ok(format!("INFO: {}.mdx を作成しました。", &new_file_name));
    }
}

fn main() {
    let gen_mdx = GenMdx::from_args();
    gen_mdx.run();
}
